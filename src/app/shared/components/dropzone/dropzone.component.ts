import { Component, input, linkedSignal, OnInit, output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { fileValidator } from '@core/validators/input-file.validator';
import { DropzoneFunctionalities } from '@shared/component-classes/dropzone-functionalities.class';

@Component({
    selector: 'mi-dropzone',
    templateUrl: './dropzone.component.html',
    styleUrl: './dropzone.component.css',
    standalone: false
})
export class DropzoneComponent extends DropzoneFunctionalities implements OnInit {
  name = input.required<string>();
  showDimentionsText = input<boolean>(true);
  showBiggerSvg = input<boolean>(true);
  showPreviewFiles = input<boolean>(true);
  previewFileUrls = input<boolean>(false);
  filePreviewUrl = output<any[]>();

  allowedFiles = input<string[]>([ 'image/jpg', 'image/png', 'image/jpeg', 'application/pdf' ]);
  allowedFilesWithCommaSeparator = linkedSignal(() => this.allowedFiles().join(','));
  required = input<boolean>(false);
  requiredMessage = linkedSignal(() => this.required() ? { required: 'Por favor, selecione pelo menos um arquivo.' } : {});

  isInvalidFromParent = input.required<boolean>();

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      'file': new FormControl(null, [
        fileValidator({
          required: this.required(),
          maxSizeMB: 2,
          totalSizeMB: 6,
          allowedTypes: this.allowedFiles(),
          messages: {
            ...this.requiredMessage(),
            fileSize: 'Cada arquivo deve ter no máximo 2MB.',
            totalSize: 'O total combinado dos arquivos deve ser no máximo 6MB.',
            fileType: 'Um ou mais arquivos seleccionados não são dos formatos aceitáveis'
          }
        })
      ])
    })
  }

  dropzoneOnChange($event: any){
    this.files = $event.files;
    this.formGroup.get('file')?.setValue(this.files);
    this.startFilesSetup(this.files);
  }

  emit(): void{
    if(!this.previewFileUrls) return;
    this.filePreviewUrl.emit(this.files);
  }
}
