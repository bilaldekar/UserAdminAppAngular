import { TestBed } from "@angular/core/testing";
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
describe('user service', function () {
    var httpTestingController;
    var service;
    var testUser = [
        { userId: 1, userFirstName: 'bilal', userLastName: 'dekar', userEmail: 'gmail', userActive: true, userUserName: 'bilal.dekar' }
    ];
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });
        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(UserService);
    });
    describe('getUser', function () {
        it('should get all users', function () {
            service.getUsers(true, null, null, null, null).subscribe(function (data) {
                expect(data.length).toBe(1);
            });
            var userRequest = httpTestingController.expectOne('http://localhost:8080/api/users/all/true/null/null/null/null');
            //check the method name is GET
            expect(userRequest.request.method).toEqual('GET');
            //add testUsers data to the body of the response
            userRequest.flush(testUser);
            //check that all the http calls are handled
            httpTestingController.verify();
        });
        it('should call get with the correct url', function () {
            service.getUser(1).subscribe();
            var req = httpTestingController.expectOne('http://localhost:8080/api/users/1');
            req.flush(testUser);
            httpTestingController.verify();
        });
    });
});
//# sourceMappingURL=user.service.spec.js.map