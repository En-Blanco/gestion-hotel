import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  imports: [Header, Footer],
  selector: 'app-sobre-nosotros',
  styleUrl: './sobre-nosotros.css',
  templateUrl: './sobre-nosotros.html',
})
export class SobreNosotros {}
