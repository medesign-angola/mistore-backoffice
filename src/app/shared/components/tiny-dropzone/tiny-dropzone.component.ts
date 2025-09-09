import { Component, input, linkedSignal, OnInit, output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { fileValidator } from '@core/validators/input-file.validator';
import { DropzoneFunctionalities } from '@shared/component-classes/dropzone-functionalities.class';

@Component({
  selector: 'mi-tiny-dropzone',
  standalone: false,
  templateUrl: './tiny-dropzone.component.html',
  styles: ``
})
export class TinyDropzoneComponent extends DropzoneFunctionalities implements OnInit {
  name = input.required<string>();
  showDimentionsText = input<boolean>(true);
  showBiggerSvg = input<boolean>(true);
  showPreviewFiles = input<boolean>(true);
  previewFileUrls = input<boolean>(false);
  filePreviewUrl = output<any[]>();

  layout = input<'circle' | 'rectangle'>('circle')

  allowedFiles = input<string[]>([ 'image/jpg', 'image/png', 'image/jpeg' ]);
  allowedFilesWithCommaSeparator = linkedSignal(() => this.allowedFiles().join(','));
  required = input<boolean>(false);
  requiredMessage = linkedSignal(() => this.required() ? { required: 'Por favor, selecione pelo menos um arquivo.' } : {});

  isInvalidFromParent = input.required<boolean>();

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      'fileInput': new FormControl(null, [
        // fileValidator({
        //   required: this.required(),
        //   maxSizeMB: 2,
        //   totalSizeMB: 6,
        //   allowedTypes: this.allowedFiles(),
        //   messages: {
        //     ...this.requiredMessage(),
        //     fileSize: 'Cada arquivo deve ter no máximo 2MB.',
        //     totalSize: 'O total combinado dos arquivos deve ser no máximo 6MB.',
        //     fileType: 'Um ou mais arquivos seleccionados não são dos formatos aceitáveis'
        //   }
        // })
      ])
    })
  }

  dropzoneOnChange($event: Event){
    const input = $event.target as HTMLInputElement;

    if(!input.files) return;
    this.formGroup.get('file')?.setValue(Array.from(input.files));
    this.startFilesSetup(Array.from(input.files));
  }

  emit(): void{
    if(!this.previewFileUrls) return;
    this.filePreviewUrl.emit(this.files);
  }
  
}
