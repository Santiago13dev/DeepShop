import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Returns } from './returns';

describe('Returns', () => {
  let component: Returns;
  let fixture: ComponentFixture<Returns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Returns]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Returns);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Política de Devoluciones');
  });

  it('should display return period information', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('30 días');
  });

  it('should display steps for initiating a return', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Inicia sesión en tu cuenta');
    expect(compiled.textContent).toContain('Selecciona el pedido');
  });
});
