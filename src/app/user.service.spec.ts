import { TestBed } from "@angular/core/testing";
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";


describe('user service', () => {

    let httpTestingController: HttpTestingController;
    let service: UserService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        })

        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(UserService);
    })


    describe('getUser', () => {
        it('should call get with the correct url', () => {            
            
            service.getUser(1).subscribe();

            const req = httpTestingController.expectOne('http://localhost:8080/api/users/1');
            req.flush({id: 1, userActive : true, userFirstName: 'bilal', userLastName: 'dekar', userUserName:'bilal.dekar', userEmail:'gmail.com'});
            httpTestingController.verify();
        });
    })

})