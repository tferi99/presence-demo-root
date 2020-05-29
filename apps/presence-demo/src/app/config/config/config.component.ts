import { Component, Input, OnInit } from '@angular/core';
import { AppConfig } from '@presence-demo-root/common-data';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { ConfigService } from '../config.service';

@Component({
  selector: 'presence-demo-root-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  config: AppConfig;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private configService: ConfigService) {
    this.form = new FormGroup({
      'autoChangePresenceStates': new FormControl(false)
    });

    // routing getting resolver data
    this.config = this.route.snapshot.params['config'];
    this.route.data.subscribe(
      (data: Data) => {
        this.config = data['config'];
        console.log('Config resolved:', this.config);
        this.form.patchValue(this.config);
      }
    );

    this.form.valueChanges.subscribe(
      value => {
        this.configService.setConfig(value).subscribe()
      }
    )
  }

  ngOnInit(): void {
  }
}
