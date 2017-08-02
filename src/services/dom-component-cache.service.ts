import { ComponentRef, Injectable } from "@angular/core/";

@Injectable()
export class DomComponentCacheService {
    private _dynamicComponentCache: Map<Element, ComponentRef<any>> = new Map();
    private _domListeners: Map<Element, MutationObserver> = new Map();

    /**
     * Cache a component for checks
     * @param component the newly appended component to check.
     */
    public cacheComponentAt<T>(component: ComponentRef<T>) {
        if (this.ensureComponent(component)) {
            this._dynamicComponentCache.set(component.location.nativeElement, component);
            this.listenToDom(component.location.nativeElement);
            component.onDestroy(this.onDestroyComponent)
        }
    }

    private listenToDom(dom: Element) {
        let observer = new MutationObserver((mutations: MutationRecord[]) => {
            mutations.forEach((mutation) => {
                for (let i = 0; i < mutation.removedNodes.length; i++) {
                    const removedNode = mutation.removedNodes.item(i);
                    if (removedNode === dom) this.mutationOnRemoveNode(dom);
                }
            });
        });
        observer.observe(dom, { attributes: true, childList: true, characterData: true });

        this._domListeners.set(dom, observer);
    }

    /**
     * Ensures that a component is in the cache
     * @param component the component to check
     * @return boolean true if the component is in the cache
     */
    private ensureComponent<T>(component: ComponentRef<T>): boolean {
        if (this._dynamicComponentCache.has(component.location.nativeElement))
            throw "Trying to bind a component to a DOM element that already has a component"

        return true;
    }

    /**
     * Callback for deleting from cache when a component is destroyed.
     */
    public onDestroyComponent<T>(component: ComponentRef<T>) {
        console.log("destroying", component);

        this._domListeners.get(component.location.nativeElement).disconnect();
        this._domListeners.delete(component.location.nativeElement);
        this._dynamicComponentCache.delete(component.location.nativeElement);
    }

    /**
     * Destroys a component previously cached
     * @param component the component to destroy
     */
    public destroyComponent<T>(component: ComponentRef<T>) {
        try {
            if (this.ensureComponent(component)) {
                component.destroy();
            }
        }
        catch (e) {
            throw "Trying to destroy a component that is not registered with ngx-appender";
        }
    }


    private mutationOnRemoveNode(dom: Element) {
        this.destroyComponent(this._dynamicComponentCache.get(dom));
    }

}