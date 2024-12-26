export default function Home() {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '50px', backgroundColor: '#F3F4F6' }}>
            <div>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>Welcome to Contact Manager</h1>
                <p style={{ fontSize: '18px', color: '#6B7280' }}>Manage your contacts with ease</p>
            </div>
            <img src="conversation.png" alt="Conversation" style={{ width: '300px', height: 'auto' }} />
        </div>
    );
}
