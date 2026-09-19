import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderAlt } from './header-alt';

describe('HeaderAlt', () => {
  let component: HeaderAlt;
  let fixture: ComponentFixture<HeaderAlt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderAlt],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderAlt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
