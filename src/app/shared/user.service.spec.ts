import { TestBed } from "@angular/core/testing";
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { User } from './interfaces';


describe('user service', () => {

    let httpTestingController: HttpTestingController;
    let service: UserService;

    let testUser: User[] = [
        { userId: 1, userFirstName: 'bilal', userLastName: 'dekar', userEmail: 'gmail', userActive: true, userUserName: 'bilal.dekar' }
    ]

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        })

        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(UserService);
    })


    describe('getUser', () => {

        it('should get all users', () => {
            service.getUsers(true, null, null, null, null).subscribe((data: User[]) => {
                expect(data.length).toBe(1);
            });

            let userRequest: TestRequest = httpTestingController.expectOne('http://localhost:8080/api/users/all/true/null/null/null/null');
            //check the method name is GET
            expect(userRequest.request.method).toEqual('GET'); 

            //add testUsers data to the body of the response
            userRequest.flush(testUser);
            //check that all the http calls are handled
            httpTestingController.verify();
        })

        it('should call get with the correct url', () => {
            service.getUser(1).subscribe();

            const req = httpTestingController.expectOne('http://localhost:8080/api/users/1');
            req.flush(testUser);
            httpTestingController.verify();
        });
    })

})