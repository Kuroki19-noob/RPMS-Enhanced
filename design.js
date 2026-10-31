document.addEventListener("DOMContentLoaded", function () {

  // Get the current page filename
  const currentPage = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

  // Get all sidebar navigation items
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach(function (item) {

    const link = item.querySelector("a");
    const linkPage = link.getAttribute("href")
      .split("/")
      .pop()
      .toLowerCase();

    
    item.classList.remove("active");

    if (linkPage === currentPage) {
      item.classList.add("active");
    }

  });

});


document.addEventListener("DOMContentLoaded", function () {
  const conversationItems = document.querySelectorAll(".conversation-item");
  const conversationList = document.getElementById("conversationList");
  const searchInput = document.getElementById("searchInquiries");
  const messageForm = document.getElementById("messageForm");
  const messageInput = document.getElementById("messageInput");
  const messageArea = document.getElementById("messageArea");

  const chatName = document.getElementById("chatName");
  const headerAvatar = document.getElementById("headerAvatar");
  const bannerApartment = document.getElementById("bannerApartment");
  const bannerRent = document.getElementById("bannerRent");
  const detailsApartment = document.getElementById("detailsApartment");
  const detailsRent = document.getElementById("detailsRent");
  const detailsOwner = document.getElementById("detailsOwner");
  const detailsAvatar = document.getElementById("detailsAvatar");

  // Demo messages for each conversation
  const conversations = {
    "Juan Dela Cruz": [
      {
        sender: "owner",
        text: "Hello! Thank you for your interest in my apartment.",
        time: "10:25 AM"
      },
      {
        sender: "tenant",
        text: "Hi! I would like to ask if the apartment is still available.",
        time: "10:28 AM"
      },
      {
        sender: "owner",
        text: "Yes, the unit is currently available. Would you like to schedule a visit?",
        time: "10:30 AM"
      }
    ],

    "Maria Santos": [
      {
        sender: "owner",
        text: "Hello! Welcome to Greenfield Residences.",
        time: "9:15 AM"
      },
      {
        sender: "tenant",
        text: "May I ask about the requirements for renting?",
        time: "9:20 AM"
      },
      {
        sender: "owner",
        text: "You will need a valid ID and the required rental deposit.",
        time: "9:25 AM"
      }
    ],

    "Pedro Reyes": [
      {
        sender: "owner",
        text: "Good day! Thank you for your inquiry.",
        time: "2:00 PM"
      },
      {
        sender: "tenant",
        text: "Can I schedule a visit to the apartment?",
        time: "2:05 PM"
      },
      {
        sender: "owner",
        text: "Yes, you can schedule a visit. Please let me know your preferred date.",
        time: "2:10 PM"
      }
    ]
  };

  let activeOwner = "Juan Dela Cruz";

  function getCurrentTime() {
    return new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit"
    });
  }

  // Create a message bubble
  function createMessage(sender, text, time, initials) {
    const message = document.createElement("div");
    message.className = sender === "tenant"
      ? "message sent"
      : "message received";

    if (sender === "owner") {
      const avatar = document.createElement("div");
      avatar.className = "message-avatar";
      avatar.textContent = initials;
      message.appendChild(avatar);
    }

    const content = document.createElement("div");
    content.className = "message-content";

    const bubble = document.createElement("div");
    bubble.className = "message-bubble";
    bubble.textContent = text;

    const timestamp = document.createElement("span");
    timestamp.className = "message-time";
    timestamp.textContent = time;

    content.appendChild(bubble);
    content.appendChild(timestamp);
    message.appendChild(content);

    return message;
  }

  // Display messages for the selected owner
  function renderMessages(ownerName, initials) {
    messageArea.innerHTML = "";

    const divider = document.createElement("div");
    divider.className = "date-divider";

    const dateLabel = document.createElement("span");
    dateLabel.textContent = "Conversation";
    divider.appendChild(dateLabel);

    messageArea.appendChild(divider);

    const messages = conversations[ownerName] || [];

    messages.forEach(function (message) {
      messageArea.appendChild(
        createMessage(
          message.sender,
          message.text,
          message.time,
          initials
        )
      );
    });

    messageArea.scrollTop = messageArea.scrollHeight;
  }

  // Switch to a selected conversation
  function selectConversation(item) {
    conversationItems.forEach(function (conversation) {
      conversation.classList.remove("active");
    });

    item.classList.add("active");

    const ownerName = item.dataset.name;
    const apartment = item.dataset.apartment;
    const rent = item.dataset.rent;
    const initials = item.dataset.initials;

    activeOwner = ownerName;

    chatName.textContent = ownerName;
    headerAvatar.textContent = initials;
    detailsOwner.textContent = ownerName;
    detailsAvatar.textContent = initials;

    bannerApartment.textContent = apartment;
    bannerRent.textContent = rent;

    detailsApartment.textContent = apartment;
    detailsRent.textContent = rent.split(" / ")[0];

    renderMessages(ownerName, initials);

    // Remove the unread indicator when selected
    const unreadDot = item.querySelector(".unread-dot");
    if (unreadDot) {
      unreadDot.remove();
    }
  }

  conversationItems.forEach(function (item) {
    item.addEventListener("click", function () {
      selectConversation(item);
    });
  });

  // Search conversations
  searchInput.addEventListener("input", function () {
    const keyword = searchInput.value.toLowerCase().trim();

    conversationItems.forEach(function (item) {
      const searchableText = [
        item.dataset.name,
        item.dataset.apartment,
        item.querySelector(".last-message").textContent
      ].join(" ").toLowerCase();

      item.style.display = searchableText.includes(keyword)
        ? "flex"
        : "none";
    });
  });

  // Send a demo message
  messageForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = messageInput.value.trim();

    if (text === "") {
      return;
    }

    if (!conversations[activeOwner]) {
      conversations[activeOwner] = [];
    }

    const time = getCurrentTime();
    const activeItem = document.querySelector(".conversation-item.active");
    const initials = activeItem.dataset.initials;

    const newMessage = {
      sender: "tenant",
      text: text,
      time: time
    };

    conversations[activeOwner].push(newMessage);

    messageArea.appendChild(
      createMessage("tenant", text, time, initials)
    );

    messageArea.scrollTop = messageArea.scrollHeight;

    // Update the latest message preview
    const lastMessage = activeItem.querySelector(".last-message");
    lastMessage.textContent = text;

    const conversationTime = activeItem.querySelector(
      ".conversation-top span"
    );

    conversationTime.textContent = time;

    messageInput.value = "";
    messageInput.focus();
  });

  // Demo button: replace with your actual apartment page URL
  document.getElementById("viewApartment").addEventListener("click", function () {
    const activeItem = document.querySelector(".conversation-item.active");

    const apartmentPages = {
      "Sunrise Apartment": "user-apartment.html",
      "Greenfield Residences": "user-apartment.html",
      "City View Apartment": "user-apartment.html"
    };

    const page = apartmentPages[activeItem.dataset.apartment];

    if (page) {
      window.location.href = page;
    }
  });

  // Display the default conversation
  const defaultConversation = document.querySelector(
    ".conversation-item.active"
  );

  if (defaultConversation) {
    selectConversation(defaultConversation);
  }

  if (window.lucide) {
    lucide.createIcons();
  }
});


 
