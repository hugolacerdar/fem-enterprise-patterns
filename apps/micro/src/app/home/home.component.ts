import { Component } from '@angular/core';
import { Widget } from '@fem/api-interfaces';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'fem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  price;
  mode;
  widgets: Widget[];

  reCalculateTotal(mode: string, widgets, newWidget: Widget) {
    this.widgets = this.updateWidgets(mode, widgets, newWidget);
    this.price = this.getTotalPrice(this.widgets);
  }

  updateWidgets(mode: string, widgets, newWidget) {
    switch (mode) {
      case 'create':
        return this.addWidget(widgets, newWidget);
      case 'update':
        return this.updateWidget(widgets, newWidget);
      case 'delete':
        return this.deleteWidget(widgets, newWidget);
      default:
        return widgets;
    }
  }

  getTotalPrice(widgets) {
    return widgets.reduce((acc, curr) => acc + curr.price, 0);
  }

  addWidget(widgets, widget) {
    const newWidget = Object.assign({}, widget, { id: uuidv4() });
    return [...widgets, newWidget];
  }

  updateWidget(widgets, widget) {
    return widgets.map((_widget) =>
      widget.id === _widget.id ? Object.assign({}, widget) : _widget
    );
  }

  deleteWidget(widgets, widget) {
    return widgets.filter((_widget) => widget.id !== _widget.id);
  }
}
