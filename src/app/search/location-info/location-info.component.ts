import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-location-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location-info.component.html',
  styleUrl: './location-info.component.css'
})
export class LocationInfoComponent {
  mapsUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    const mapsEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.016368444724!2d-80.4470535240123!3d-3.5837152963904466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x90338cc58cf0153b%3A0xaa242886f950c791!2sUniversidad%20Nacional%20de%20Tumbes!5e0!3m2!1ses!2sus!4v1762523223683';
    this.mapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(mapsEmbedUrl);
  }
}
