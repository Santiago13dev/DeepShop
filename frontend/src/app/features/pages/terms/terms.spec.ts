import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Terms } from './terms';

describe('Terms', () => {
  let component: Terms;
  let fixture: ComponentFixture<Terms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Terms]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Terms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Términos y Condiciones');
  });
});
