import { PokeCamaraPage } from './app.po';

describe('poke-camara App', function() {
  let page: PokeCamaraPage;

  beforeEach(() => {
    page = new PokeCamaraPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
