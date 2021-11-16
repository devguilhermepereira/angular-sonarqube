import {MenuComponent} from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;

  beforeEach(async () => {
    component = new MenuComponent();
  });

  it('Iniciar component', () => {
    expect(component).toBeTruthy();
  });
});
