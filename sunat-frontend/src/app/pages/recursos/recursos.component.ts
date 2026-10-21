import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RecursoService } from '../../services/recurso.service';

@Component({
  selector: 'app-recursos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Topbar SUNAT -->
    <div class="sunat-header py-2 px-4 text-white d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center gap-2">
        <span class="fw-bold fs-5 text-warning">SUNAT</span>
        <span class="small border-start ps-2">Operaciones en Línea</span>
      </div>
      <div class="small">
        <span>Bienvenido, <strong>{{ userData.nombreORazonSocial }}</strong></span>
        <button class="btn btn-sm btn-outline-light ms-3" (click)="salir()">Salir</button>
      </div>
    </div>

    <div class="container my-4">
      <div class="card shadow-sm border-0">
        <div class="card-header bg-primary text-white py-2">
          <h6 class="mb-0 fw-bold" *ngIf="step < 5">INGRESO DE RECURSOS IMPUGNATORIOS - SELECCIÓN DE VALORES</h6>
          <h6 class="mb-0 fw-bold" *ngIf="step === 5">INGRESO DE RECURSOS IMPUGNATORIOS - SUSTENTO</h6>
        </div>

        <div class="card-body p-4">
          <!-- DATOS DE CABECERA -->
          <div class="row g-2 mb-3 bg-light p-3 rounded border align-items-center">
            <div class="col-md-3">
              <label class="small text-muted d-block">Tipo de Documento:</label>
              <strong>RUC</strong>
            </div>
            <div class="col-md-3">
              <label class="small text-muted d-block">Número de Documento:</label>
              <strong>{{ userData.ruc }}</strong>
            </div>
            <div class="col-md-6">
              <label class="small text-muted d-block">Nombre o Razón Social:</label>
              <strong>{{ userData.nombreORazonSocial }}</strong>
            </div>
          </div>

          <!-- PASO 1: MATERIA Y RECURSO  -->
          <div *ngIf="step === 1">
            <div class="mb-3">
              <label class="fw-bold text-primary mb-2">Materia del Recurso:</label><br>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="materia" value="TRIBUTOS INTERNOS" [(ngModel)]="materia">
                <label class="form-check-label">Tributos</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="materia" value="ADUANAS" [(ngModel)]="materia">
                <label class="form-check-label">Aduanas</label>
              </div>
            </div>

            <div class="mb-3">
              <label class="fw-bold text-primary mb-2">Tipo del Recurso:</label><br>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="tipoRecurso" value="RECLAMACIÓN" [(ngModel)]="tipoRecurso">
                <label class="form-check-label">Recurso de Reclamación</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="tipoRecurso" value="APELACIÓN" [(ngModel)]="tipoRecurso">
                <label class="form-check-label">Recurso de Apelación</label>
              </div>
            </div>

            <div class="text-end mt-4">
              <button class="btn btn-primary px-4" (click)="step = 2">Continuar &raquo;</button>
            </div>
          </div>

          <!--  PASO 2: TIPO DE ACTO IMPUGNADO  -->
          <div *ngIf="step === 2">
            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="small text-muted">Materia del Recurso:</label>
                <input type="text" class="form-control form-control-sm" [value]="materia" disabled>
              </div>
              <div class="col-md-6">
                <label class="small text-muted">Tipo del Recurso:</label>
                <input type="text" class="form-control form-control-sm" [value]="tipoRecurso" disabled>
              </div>
            </div>

            <div class="mb-3">
              <label class="fw-bold mb-1">Tipo del Acto Impugnado:</label>
              <select class="form-select form-select-sm" [(ngModel)]="actoImpugnado">
                <option value="" disabled>Seleccione</option>
                <option value="Resolución de Multa">Resolución de Multa (RM)</option>
                <option value="Resolución de Determinación">Resolución de Determinación (RD)</option>
                <option value="Orden de Pago">Orden de Pago (OP)</option>
              </select>
            </div>

            <div class="d-flex justify-content-between mt-4">
              <button class="btn btn-outline-secondary btn-sm px-3" (click)="step = 1">&laquo; Atrás</button>
              <button class="btn btn-primary btn-sm px-4" (click)="irABusquedaValores()">Continuar &raquo;</button>
            </div>
          </div>

          <!-- PASO 3: MODAL DE BÚSQUEDA Y FILTROS -->
          <div *ngIf="step === 3" class="p-3 bg-light border rounded">
            <h6 class="fw-bold text-secondary mb-3">Filtro de búsqueda de valores:</h6>
            <div class="row g-3 mb-2">
              <div class="col-md-4">
                <label class="small">Por etapa del Valor:</label>
                <select class="form-select form-select-sm"><option>Todos</option></select>
              </div>
              <div class="col-md-4">
                <label class="small">Fecha Emisión Inicio:</label>
                <input type="date" class="form-control form-control-sm" value="2023-03-01">
              </div>
              <div class="col-md-4">
                <label class="small">Fecha Emisión Fin:</label>
                <input type="date" class="form-control form-control-sm" value="2024-02-29">
              </div>
            </div>
            <div class="text-end mt-3">
              <button class="btn btn-primary btn-sm px-4" (click)="buscarValores()">Buscar</button>
            </div>
          </div>

          <!-- PASO 4: TABLA CON CHECKBOXES DE VALORES -->
          <div *ngIf="step === 4">
            <div class="table-responsive">
              <table class="table table-bordered table-hover align-middle small">
                <thead class="table-light">
                  <tr>
                    <th class="text-center">Seleccionar</th>
                    <th>Tipo de valor</th>
                    <th>Número de valor</th>
                    <th>Indicador Reclamo Parcial</th>
                    <th>Código Tributo</th>
                    <th>Periodo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of listaValores">
                    <td class="text-center">
                      <input type="checkbox" [(ngModel)]="item.selected">
                    </td>
                    <td>{{ item.tipo }}</td>
                    <td>{{ item.numero }}</td>
                    <td class="text-center"><input type="checkbox" disabled></td>
                    <td>{{ item.codigo }}</td>
                    <td>{{ item.periodo }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="d-flex justify-content-between mt-3">
              <button class="btn btn-outline-secondary btn-sm" (click)="step = 2">&laquo; Cancelar</button>
              <button class="btn btn-primary btn-sm px-4" (click)="confirmarSeleccion()">Aceptar &raquo;</button>
            </div>
          </div>

          <!--  PASO 5: SUSTENTO Y ADJUNTAR ARCHIVOS  -->
          <div *ngIf="step === 5">
            <div class="mb-3">
              <label class="fw-bold mb-1">Sustento del Recurso <span class="text-danger">*</span>:</label>
              <textarea class="form-control" rows="3" [(ngModel)]="sustento" placeholder="ESTIMADOS SEÑORES DE LA SUNAT, ADJUNTO UN ESCRITO EN EL QUE SUSTENTO MI RECURSO..."></textarea>
            </div>

            <div class="mb-3">
              <label class="fw-bold mb-2">Ingresar Archivos:</label><br>
              <input type="file" #fileInput class="d-none" (change)="agregarArchivo($event)">
              <button class="btn btn-primary btn-sm mb-2" (click)="fileInput.click()">Seleccionar Archivos</button>

              <table class="table table-sm table-bordered mt-2 small">
                <thead class="table-light">
                  <tr>
                    <th>Nombre Archivo</th>
                    <th>Tamaño</th>
                    <th class="text-center">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let file of archivosAdjuntos; let i = index">
                    <td>{{ file.nombre }}</td>
                    <td>{{ file.tamano }}</td>
                    <td class="text-center">
                      <button class="btn btn-sm btn-outline-danger py-0" (click)="eliminarArchivo(i)">🗑️</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="d-flex justify-content-end gap-2 mt-4">
              <button class="btn btn-outline-secondary btn-sm" (click)="step = 4">Cancelar</button>
              <button class="btn btn-primary btn-sm px-4" (click)="mostrarModalConfirmacion = true">Grabar</button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- MODAL DE CONFIRMACIN FINAL -->
    <div class="modal d-block bg-dark bg-opacity-50" *ngIf="mostrarModalConfirmacion">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white py-2">
            <h6 class="modal-title fw-bold">Ingreso de Recursos Impugnatorios - Sustento</h6>
          </div>
          <div class="modal-body small">
            Considere que el sustento de su recurso debe ser consistente respecto del total de actos impugnados que seleccionó inicialmente.
          </div>
          <div class="modal-footer py-1">
            <button class="btn btn-primary btn-sm px-4 mx-auto" (click)="guardarEnNeonFinal()">Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sunat-header { background-color: #002D62; }
  `]
})
export class RecursosComponent implements OnInit {
  userData: any = {};
  step: number = 1;
  materia: string = 'TRIBUTOS INTERNOS';
  tipoRecurso: string = 'RECLAMACIÓN';
  actoImpugnado: string = '';
  sustento: string = 'ESTIMADOS SEÑORES DE LA SUNAT, ADJUNTO UN ESCRITO EN EL QUE SUSTENTO MI RECURSO DE RECLAMACIÓN, ASÍ COMO LA EVIDENCIA CORRESPONDIENTE.';
  
  mostrarModalConfirmacion: boolean = false;

  listaValores = [
    { selected: true, tipo: 'RM', numero: '1630020029843', codigo: '064401', periodo: '202305' },
    { selected: true, tipo: 'RM', numero: '1640020016469', codigo: '060901', periodo: '202210' },
    { selected: true, tipo: 'RM', numero: '1640020016470', codigo: '060901', periodo: '202211' },
    { selected: false, tipo: 'RD Deuda Determinada', numero: '1640030013282', codigo: '010101', periodo: '202210' }
  ];

  archivosAdjuntos = [
    { nombre: '01 Escrito sustentado.pdf', tamano: '12.03MB' },
    { nombre: '02 Detalle de sustento.pdf', tamano: '14.57MB' },
    { nombre: '03 Registro de compras y Ventas - Electronico.pdf', tamano: '1.88MB' }
  ];

  constructor(private router: Router, private recursoService: RecursoService) {}

  ngOnInit() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.userData = JSON.parse(userJson);
    }
  }

  irABusquedaValores() {
    if (!this.actoImpugnado) {
      alert('Seleccione un Tipo del Acto Impugnado.');
      return;
    }
    this.step = 3;
  }

  buscarValores() {
    this.step = 4;
  }

  confirmarSeleccion() {
    this.step = 5;
  }

  agregarArchivo(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.archivosAdjuntos.push({
        nombre: file.name,
        tamano: (file.size / (1024 * 1024)).toFixed(2) + 'MB'
      });
    }
  }

  eliminarArchivo(index: number) {
    this.archivosAdjuntos.splice(index, 1);
  }

  guardarEnNeonFinal() {
    this.mostrarModalConfirmacion = false;
    const payload = {
      ruc: this.userData.ruc,
      materia: this.materia,
      tipoRecurso: this.tipoRecurso,
      actoImpugnado: this.actoImpugnado,
      sustento: this.sustento
    };

    this.recursoService.guardarRecurso(payload).subscribe({
      next: () => {
        alert('¡Recurso de Reclamación registrado exitosamente en Neon!');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Error al intentar guardar el recurso.');
      }
    });
  }

  salir() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}