import React, { useState } from 'react';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';

export default function Profile() {

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const [editing, setEditing] = useState("");
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

        if (editing) {
            const response = await axios.put(`http://localhost:8002/profile/${editing}`, contact, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            if(response.status >= 200 && response.status < 300){
                setContacts(contacts.map((c) => c._id === editing ? contact : c));
                setEditing("");
            }
            else{
                alert("Failed to update contact");
            }
            return;
        }
        await axios.post('http://localhost:8002/profile', contact, {
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
        axios.get('http://localhost:8002/profile', {
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
    async function Edit(c){
        setContact({
            name: c.name,
            email: c.email,
            phone: c.phone,
            type: c.type,
        });
        setEditing(c._id);
    }
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
                            <button className='edit-btn' onClick={()=>Edit(c)} >Edit</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
