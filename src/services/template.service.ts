import { injectable } from 'inversify';
import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import { ITemplateService } from '../interfaces/template.service.interface';

@injectable()
export class TemplateServiceImpl implements ITemplateService {
  public async render(templateName: string, data: object): Promise<string> {
    const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.html`);
    const templateContent = await fs.promises.readFile(templatePath, 'utf-8');
    const compiledTemplate = _.template(templateContent);
    return compiledTemplate(data);
  }
}
