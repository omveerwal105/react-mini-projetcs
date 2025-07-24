import React, { useEffect, useState } from 'react'
import JobCard from './JobCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const JobDashboard = () => {
    const [searchItem, setSearchItem] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [jobs, setJobs] = useState([
        { id: 1, title: 'Frontend Developer', company: 'Google', location: 'Remote', status: 'Interview' },
        { id: 2, title: 'React Developer', company: 'Amazon', location: 'Bangalore', status: 'Applied' },
    ]);

    const [newJob, setNewJob] = useState({
        title: '',
        company: '',
        location: '',
        status: '',
    });
    const [edit, setEdit] = useState(null);


    const filtered = jobs.filter((job) => {
        const search = searchItem.toLowerCase();
        const status = statusFilter.toLowerCase();

        return (job.title.toLowerCase().includes(search) &&
            (job.status.toLowerCase() === status || status === '')
        );
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newJob.title.trim() === '') return alert('Enter the title');

        if (!newJob.company.trim() || !newJob.location.trim() || !newJob.status.trim()) {
            return alert('Please fill all fields');
        }

        if (edit) {
            const updated = jobs.map((job) => job.id === edit.id ? { ...edit, ...newJob } : job);
            setJobs(updated); 
            setEdit(null);      

            toast.success('Job updated')
        }
        else {
            const newJobEntry = { ...newJob, id: Date.now() };
            setJobs([...jobs, newJobEntry]);
            toast.success('Job Added');
        }

        setNewJob({
            title: '',
            company: '',
            location: '',
            status: '',
        })

    };

    useEffect(() => {
        localStorage.setItem('jobs', JSON.stringify(jobs));
    }, [jobs]);

    useEffect(() => {
        const storedItem = localStorage.getItem('jobs');
        if (storedItem) {
            setJobs(JSON.parse(storedItem));
        }
    }, []);

    const handleEdit = (job) => {
        setNewJob(job);
        setEdit(job);
    }

    const handleDelete = (id) => {
        const updated = jobs.filter((job) => job.id !== id);
        setJobs(updated);
        toast.info('Job Delted');
    }

    return (
        <div className='container'>
            <div className='row mb-4'>
                <h4 className="text-center mb-3">Add New Job</h4>

                <form onSubmit={handleSubmit}>
                    <div className='col-md-6 offset-md-3'>

                        <label className='form-label'>Title</label>
                        <input
                            className='form-control mb-2'
                            placeholder='enter the title'
                            value={newJob.title}
                            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                        />
                    </div>
                    <div className='col-md-6 offset-md-3'>
                        <input
                            className='form-control mb-2'
                            placeholder='company'
                            value={newJob.company}
                            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                        />
                    </div>
                    <div className='col-md-6 offset-md-3'>

                        <input
                            className='form-control mb-2'
                            placeholder='location'
                            value={newJob.location}
                            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                        />
                    </div>
                    <div className='col-md-6 offset-md-3'>

                        <select
                            className='form-control mb-2'
                            value={newJob.status}
                            onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
                        >
                            <option value="">Select Status</option>
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                        </select>
                    </div>
                    <button className='btn btn-primary w-100' type='submit'>Add</button>

                </form>
            </div>
            <h4 className='text-muted'>Total Jobs : {jobs.length}</h4>
            <h2 className='text-center'>Job Applications</h2>
            <div className="row mb-3">
                <div className="col-md-3 offset-md-3">
                    <label className="form-label">Find Here</label>
                    <input
                        className="form-control"
                        placeholder="Find Job"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                    />
                </div>
                <div className='col-md-3 '>
                    <label className='form-label'>Filter By Status</label>
                    <select
                        className='form-control'
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                    </select>
                </div>
            </div>

            {filtered && filtered.map((job) => (
                <JobCard key={job.id} job={job} onDelete={handleDelete} onEdit={handleEdit} />
            ))}

            {filtered.length === 0 && <p className="text-center mt-3 text-danger">No jobs found</p>}

            <ToastContainer />

        </div>
    )
}

export default JobDashboard