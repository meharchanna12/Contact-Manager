import React, { useState } from 'react';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';

export default function Profile() {

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
    });

    const [contacts, setContacts] = useState([]);

    const { name, email, phone, type } = contact;

    const onChange = (e) =>
        setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8000/profile', contact, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        setContacts([...contacts, contact]);
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal',
        });
    };

    const clearAll = () => {
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal',
        });
    };

    if (!token) {
        alert('Please login to view this page');
        return <Navigate to="/login" />;
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
        alert("Please login to view this page");
        return <Navigate to="/login" />;
        }
        axios.get('http://localhost:8000/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        })
        .then((response)=>{
            console.log(response);
            if(response.status >= 200 && response.status < 300){
                setContacts(Array.isArray(response.data) ? response.data : []);
            }
            else{
                alert("Failed to fetch contacts");
            }
        })
    },[token])

    return (
        <div className="profile-container">
            <form onSubmit={onSubmit} className="add-contact">
                <h2>Add Contact</h2>

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={onChange}
                />

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onChange}
                />

                <input
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={phone}
                    onChange={onChange}
                />

                <h5>Contact Type</h5>
                <div className="radio-buttons">
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="personal"
                            checked={type === 'personal'}
                            onChange={onChange}
                        />{' '}
                        Personal
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="professional"
                            checked={type === 'professional'}
                            onChange={onChange}
                        />{' '}
                        Professional
                    </label>
                </div>

                <div>
                    <input type="submit" value="Add Contact" className="btn" />
                </div>

                <div>
                    <button
                        type="button"
                        className="btn clear-btn"
                        onClick={clearAll}
                    >
                        Clear
                    </button>
                </div>
            </form>

            <div className="contacts-display">
                <h2>Contacts</h2>
                <div className="contacts-container">
                    {contacts.map((c, index) => (
                        <div key={index} className="contact-card">
                            <p><strong>Name:</strong> {c.name}</p>
                            <p><strong>Email:</strong> {c.email}</p>
                            <p><strong>Phone:</strong> {c.phone}</p>
                            <p><strong>Type:</strong> {c.type}</p>
                            <button className='edit-btn'>Edit</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
