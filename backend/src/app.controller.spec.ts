import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(() => {
    appService = new AppService();
  });

  it('should return the expected greeting', () => {
    expect(appService.getHello()).toBe('Hello World!'); // Если изменится, тест сломается
  });
});


