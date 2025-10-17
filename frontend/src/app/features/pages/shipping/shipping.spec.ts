import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Shipping } from './shipping';

describe('Shipping', () => {
  let component: Shipping;
  let fixture: ComponentFixture<Shipping>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shipping]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Shipping);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Política de Envíos');
  });

  it('should display shipping methods', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Envío Estándar');
    expect(compiled.textContent).toContain('Envío Express');
    expect(compiled.textContent).toContain('Envío Prioritario');
  });
});
