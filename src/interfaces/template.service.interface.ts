export interface ITemplateService {
    render(templateName: string, data: object): Promise<string>;
  }
  