import {  ContentChildren, Directive, Input, SimpleChange,
        QueryList } from "@angular/core";

import { PaCellColor } from "./cellColor.directive";

@Directive({
    selector: "table"
})
export class PaCellColorSwitcher{

    @Input("paCellDarkColor")
    modelProperty: Boolean;

    @ContentChildren(PaCellColor)
    contentChildren: QueryList<PaCellColor>;

    ngOnChanges( changes: { [property:string]: SimpleChange}){
            this.updateContentChildren( changes["modelProperty"].currentValue);
    }

    ngAfterContentInit() {
        console.log("L22 called........");
        this.contentChildren.changes.subscribe(() => {
            setTimeout(() => this.updateContentChildren(this.modelProperty), 0);
        });
    }

    private updateContentChildren( dark:Boolean){
        if( this.contentChildren != null && dark != undefined){
            this.contentChildren.forEach((child,index)=>{
                    child.setColor(index%2? dark: !dark);
            });
        }
    }
}