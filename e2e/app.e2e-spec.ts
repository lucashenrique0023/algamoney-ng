import { AlgamoneyNgPage } from './app.po';

describe('algamoney-ng App', () => {
  let page: AlgamoneyNgPage;

  beforeEach(() => {
    page = new AlgamoneyNgPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
