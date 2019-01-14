import { Page1Service } from './../pages/page1/page1.service';
import { MainService } from './main.service';

describe('MainService', ()=>
{
    let service: MainService;

    beforeEach(()=>{
        service = new MainService();
    })

    it('should test', ()=>
    {
        let text = service.showText();

        expect(text).toMatch("Mon texte");
    });
});