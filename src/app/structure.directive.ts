import{ Directive, SimpleChange, ViewContainerRef, TemplateRef, Input} from "@angular/core";

@Directive({
    selector: "[paIf]"
})
export class PaStructureDirective {
    constructor(    private container: ViewContainerRef,
                    private template: TemplateRef<Object>) {
            console.log("L9 constructor");            
    }

    @Input("paIf")
    expressionResult: boolean;

    ngOnChanges(changes: { [property: string]: SimpleChange }) {
        let change = changes["expressionResult"];
        console.log("L17 " + change.currentValue);
        console.log("L18 " + change.isFirstChange());

        if (!change.isFirstChange() && !change.currentValue) {
            console.log("L20 " );
            this.container.clear();
        } else if (change.currentValue) {
            console.log("L23 " );
            this.container.createEmbeddedView(this.template);
        }
    }
}