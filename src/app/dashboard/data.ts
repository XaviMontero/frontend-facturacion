import { ConsultaService } from './../_services/consulta.service';
import { Directive, OnInit, OnDestroy } from '@angular/core';
import { DataBindingDirective, GridComponent } from '@progress/kendo-angular-grid';
 
import { Subscription } from 'rxjs';

@Directive({
    selector: '[contagiosBinding]'
})
export class ContagiosBindingDirective extends DataBindingDirective implements OnInit, OnDestroy {
    private serviceSubscription: Subscription;

    constructor(private consulta: ConsultaService, grid: GridComponent) {
        super(grid);
    }

    public ngOnInit(): void {
        this.serviceSubscription = this.consulta.consultarContagios().subscribe((result) => {
            this.grid.loading = false;
            this.grid.data = result;
            this.notifyDataChange();
          
        });
        super.ngOnInit();

        this.rebind();
    }

    public ngOnDestroy(): void {
        if (this.serviceSubscription) {
            this.serviceSubscription.unsubscribe();
        }

        super.ngOnDestroy();
    }

    public rebind(): void {
        this.grid.loading = true;

        
    }
}
