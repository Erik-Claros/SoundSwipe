import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
    { code: 'fr', label: 'French' },
    // Add more languages as needed
  ];

  selectedLanguage = this.languageService.getLanguage();

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.selectedLanguage = this.languageService.getLanguage();
  }

  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }
}
