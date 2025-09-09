import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface FileValidatorOptions {
  maxSizeMB?: number; // Tamanho máximo de cada arquivo
  totalSizeMB?: number; // Tamanho total permitido (todos os arquivos somados)
  allowedTypes?: string[]; // ex: ['image/png', 'application/pdf']
  required?: boolean;
  messages?: {
    required?: string;
    fileSize?: string;
    fileType?: string;
    totalSize?: string;
  };
}

export function fileValidator(options: FileValidatorOptions = {}): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fileList = control.value as FileList;

    console.log(control)

    if (!fileList || fileList.length === 0) {
      return options?.required && options.messages?.required ? { required: options.messages.required } : {};
    }

    console.log(fileList, control.value);

    let totalSize = 0;
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      totalSize += file.size;

      if (options.maxSizeMB && file.size > options.maxSizeMB * 1024 * 1024) {
        return options.messages?.fileSize ? { fileSize: options.messages.fileSize } : { fileSize: true };
      }

      console.log(file, file.type);

      if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
        return options.messages?.fileType ? { fileType: options.messages.fileType } : { fileType: true };
      }
    }

    if (options.totalSizeMB && totalSize > options.totalSizeMB * 1024 * 1024) {
      return options.messages?.totalSize ? { totalSize: options.messages.totalSize } : { totalSize: true };
    }

    return null;
  };
}
