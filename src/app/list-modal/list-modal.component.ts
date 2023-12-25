import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.scss'],
})
export class ListModalComponent {
  @Input() items: any[];
  @Input() title: string;

  editingItem: any;
  originalItem: any;
  
  startEditing(item: any) {
    this.originalItem = item;
    this.editingItem = { ...item };  // Crea una copia del elemento
  }
  

  constructor(private modalController: ModalController) { }

  close() {
    this.modalController.dismiss();
  }

  editItem(item: any) {
    // Aquí puedes manejar la acción de editar
  }

  deleteItem(item: any) {
    // Aquí puedes manejar la acción de eliminar
  }
  
  saveChanges() {
    Object.assign(this.originalItem, this.editingItem);  // Actualiza originalItem con los valores de editingItem
    // Aquí puedes guardar los cambios en Firebase
    this.editingItem = null;  // Cierra el formulario de edición
  }
  
  cancelEditing() {
    this.editingItem = null;  // Cierra el formulario de edición sin guardar los cambios
  }
  
}
