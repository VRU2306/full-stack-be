const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Task API Endpoints', () => {
    let taskId;

    it('should create a new task', (done) => {
        const taskData = {
            title: "Test Tasks Task",
            description: "Test Description",
            userId: "669ba10b509155d79dcad44c",
            column: "Todo",
            taskDueDate: "2024-07-22T11:35:27.184+00:00"
        };
        chai.request(app)
            .post('/api/task/tasks')
            .send(taskData)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                taskId = res.body._id;
                done();
            });
    });

    it('should get all tasks', (done) => {
        chai.request(app)
            .get('/api/task/tasks')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get a task by ID', (done) => {
        chai.request(app)
            .get(`/api/task/tasks/${taskId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id').eql(taskId);
                done();
            });
    });

    it('should update a task', (done) => {
        const updatedTask = {
            title: "Updated Task",
            description: "Updated Description"
        };
        chai.request(app)
            .put(`/api/tasks/tasks/${taskId}`)
            .send(updatedTask)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('title').eql('Updated Task');
                done();
            });
    });

    it('should delete a task', (done) => {
        chai.request(app)
            .delete(`/api/task/tasks/${taskId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});
