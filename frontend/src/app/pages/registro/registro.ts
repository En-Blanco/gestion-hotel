import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderAlt } from "../../components/header-alt/header-alt";

@Component({
  imports: [RouterLink, HeaderAlt],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro {}
