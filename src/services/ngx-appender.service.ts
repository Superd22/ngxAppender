import { DomComponentCacheService } from './dom-component-cache.service';
import { Injectable, Injector, ApplicationRef, ComponentFactoryResolver, NgZone, Type, ComponentRef, ChangeDetectorRef } from '@angular/core';


export interface NgxAppenderBinding {
    object: any,
    property?: string;
}

export interface NgxAbbenderBindings {
    [InputOutput: string]: NgxAppenderBinding
}

@Injectable()
export class NgxAppenderService {
    private _appRef: ApplicationRef;
    private _componentFactoryResolver: ComponentFactoryResolver;
    private _zone: NgZone;

    private _dynamicComponents: Map<Element, ComponentRef<any>> = new Map();

    public constructor(private _injector: Injector, private _cache: DomComponentCacheService) {
        this._appRef = _injector.get(ApplicationRef);
        this._zone = _injector.get(NgZone);
        this._componentFactoryResolver = _injector.get(ComponentFactoryResolver);
    }

    /**
     * Loads a component at the specified dom element, optionally executing an init on it.
     * @param component the component to initialize
     * @param dom the DOM element in which to initiliaze the component
     * @param bindings input/outputs bindings  
     * @param onInit a function to exec on init
     * @return ComponentRef a reference to the newly created component.
     */
    public loadComponentAtDom<T>(component: Type<T>, dom: Element, bindings?: NgxAbbenderBindings, onInit?: (Component: T) => void): ComponentRef<T> {
        let componentRef;

        this._zone.run(() => {
            try {
                // Create factory
                let componentFactory = this._componentFactoryResolver.resolveComponentFactory(component);
                // Create component
                componentRef = componentFactory.create(this._injector, [], dom);

                // do bindings
                this.doBindingsWithComponent(componentRef, bindings);

                // Init our component
                onInit && onInit(componentRef.instance);


                // Attach it to the view
                this._appRef.attachView(componentRef.hostView);
                // Cache it for later retrieval / mutations listeners
                this._cache.cacheComponentAt(componentRef);

            } catch (e) {
                console.error("Unable to load component", component, "at", dom);
                throw e;
            }
        });

        return componentRef;
    }

    private doBindingsWithComponent<T>(component: ComponentRef<T>, bindings: NgxAbbenderBindings) {
        
        let watchers: Map<any, { targetProperty: string, property: string, setter: (value: any) => boolean }[]> = new Map();
        if (bindings) {
            Object.keys(bindings).map((propertyName) => {
                const binding = bindings[propertyName];

                if (!binding.object) throw "no object to bind to for " + propertyName;

                // We want to bind to the object only
                if (!binding.property) {
                    component.instance[propertyName] = binding.object;
                }
                else {
                    let tuple = { targetProperty: propertyName, property: binding.property, setter: binding.object.__lookupSetter__(binding.property) };
                    if (!watchers.has(binding.object))
                        watchers.set(binding.object, [tuple]);

                    else watchers.get(binding.object).push(tuple);
                }
                // We want to bind to the property of this object and listen for changes

            });

            watchers.forEach((values, targetObj) => {
                
                (<any>component)._viewRef = component.injector.get(ChangeDetectorRef);

                Object.defineProperty(Object.getPrototypeOf(targetObj), "_ngxAppenderWatcher", {
                    enumerable: false
                    , configurable: true
                    , writable: false
                    , value: function (prop, handler) {
                        let oldTuple = values.find((tuple) => tuple.property === prop);

                        var oldval = this[prop]
                            , newval = oldval
                            , getter = function () {
                                return oldval;
                            }
                            , setter = function (val) {
                                if (oldTuple && oldTuple.setter) oldTuple.setter.call(targetObj, val);
                                
                                oldval = val;

                                handler.call(this, val);
                                return true;
                            }
                            ;

                        if (delete this[prop]) { // can't watch constants
                            Object.defineProperty(this, prop, {
                                get: getter
                                , set: setter
                                , enumerable: true
                                , configurable: true
                            });
                        }
                    }
                });

                values.map((tuple) => {
                    targetObj._ngxAppenderWatcher(tuple.property, (val) => {
                        component.instance[tuple.targetProperty] = val;
                        component.changeDetectorRef.detectChanges();
                    });
                });

            });




        }
    }

    public destroyComponent<T>(component: ComponentRef<T>) {
        return this._cache.destroyComponent(component);
    }

}