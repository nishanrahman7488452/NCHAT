// app.js

let currentUser = '';
let currentFriend = '';
let friends = {};
let profile = {};

function login() {
    const phoneNumber = document.getElementById('phone-number').value;
    const password = document.getElementById('password').value;
    if (phoneNumber && password) {
        currentUser = phoneNumber;
        profile[currentUser] = profile[currentUser] || { name: '', picture: '' };
        document.getElementById('login').style.display = 'none';
        document.getElementById('chat').style.display = 'block';
        document.getElementById('user-phone').innerText = `Logged in as: ${phoneNumber}`;
        document.getElementById('user-name').innerText = `Name: ${profile[currentUser].name}`;
        if (profile[currentUser].picture) {
            const img = document.createElement('img');
            img.src = profile[currentUser].picture;
            document.getElementById('profile').appendChild(img);
        }
        loadFriends();
    } else {
        alert('Please enter your mobile number and password');
    }
}

function logout() {
    currentUser = '';
    currentFriend = '';
    document.getElementById('chat').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}

function addFriend() {
    const friendPhone = document.getElementById('friend-phone').value;
    if (friendPhone && !friends[friendPhone]) {
        friends[friendPhone] = [];
        updateFriendsList();
        document.getElementById('friend-phone').value = '';
    } else {
        alert('Friend already added or invalid phone number');
    }
}

function updateFriendsList() {
    const friendList = document.getElementById('friend-list');
    friendList.innerHTML = '';
    for (const friend in friends) {
        const li = document.createElement('li');
        li.textContent = friend;
        li.onclick = () => selectFriend(friend);
        friendList.appendChild(li);
    }
}

function selectFriend(friend) {
    currentFriend = friend;
    document.getElementById('chat-with').innerText = `Chat with: ${friend}`;
    loadMessages();
}

function loadMessages() {
    const messages = document.getElementById('messages');
    messages.innerHTML = '';
    if (friends[currentFriend]) {
        friends[currentFriend].forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.textContent = msg;
            messages.appendChild(messageElement);
        });
        messages.scrollTop = messages.scrollHeight;
    }
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (message && currentFriend) {
        if (!friends[currentFriend]) {
            friends[currentFriend] = [];
        }
        friends[currentFriend].push(`${currentUser}: ${message}`);
        messageInput.value = '';
        loadMessages();
    }
}

function sendFile() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    if (file && currentFriend) {
        if (!friends[currentFriend]) {
            friends[currentFriend] = [];
        }
        friends[currentFriend].push(`${currentUser} sent a file: ${file.name}`);
        fileInput.value = '';
        loadMessages();
    }
}

function updateProfile() {
    const profileName = document.getElementById('profile-name').value;
    if (profileName) {
        profile[currentUser].name = profileName;
        document.getElementById('user-name').innerText = `Name: ${profileName}`;
    }
}

function setProfilePicture() {
    const profilePicInput = document.getElementById('profile-pic');
    const file = profilePicInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profile[currentUser].picture = e.target.result;
            const img = document.createElement('img');
            img.src = e.target.result;
            const profileDiv = document.getElementById('profile');
            profileDiv.appendChild(img);
        }
        reader.readAsDataURL(file);
    }
}

function loadFriends() {
    updateFriendsList();
}
