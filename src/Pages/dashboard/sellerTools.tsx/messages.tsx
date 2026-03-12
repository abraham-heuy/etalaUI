// pages/dashboard/messages.tsx
import React, { useState } from 'react';
import { 
  MessageCircle, 
  Search,
  CheckCircle,
  Send,
  Paperclip} from 'lucide-react';

const MessagesPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');

  // Mock conversations
  const conversations = [
    {
      id: 1,
      customer: 'John Kamau',
      lastMessage: 'Is the iPhone still available?',
      time: '10:30 AM',
      unread: 2,
      product: 'iPhone 13 Pro Max',
      avatar: 'JK',
      status: 'online',
    },
    {
      id: 2,
      customer: 'Mary Wanjiku',
      lastMessage: 'Do you have this in size large?',
      time: 'Yesterday',
      unread: 0,
      product: 'Leather Jacket',
      avatar: 'MW',
      status: 'offline',
    },
    {
      id: 3,
      customer: 'Peter Muthoka',
      lastMessage: 'When will you have fresh eggs again?',
      time: 'Yesterday',
      unread: 0,
      product: 'Fresh Farm Eggs',
      avatar: 'PM',
      status: 'offline',
    },
    {
      id: 4,
      customer: 'Sarah Kimani',
      lastMessage: 'Thanks for the quick delivery!',
      time: '2 days ago',
      unread: 0,
      product: 'Wireless Headphones',
      avatar: 'SK',
      status: 'online',
    },
  ];

  // Mock messages for selected conversation
  const messages = [
    {
      id: 1,
      sender: 'customer',
      text: 'Hi, is the iPhone 13 Pro Max still available?',
      time: '10:30 AM',
      read: true,
    },
    {
      id: 2,
      sender: 'me',
      text: 'Yes, it is! I have one in stock. It\'s in perfect condition.',
      time: '10:32 AM',
      read: true,
    },
    {
      id: 3,
      sender: 'customer',
      text: 'Great! Does it come with the original accessories?',
      time: '10:33 AM',
      read: true,
    },
    {
      id: 4,
      sender: 'me',
      text: 'Yes, includes charger, cable, and original box. Also has a screen protector applied.',
      time: '10:35 AM',
      read: true,
    },
    {
      id: 5,
      sender: 'customer',
      text: 'Perfect! Can we arrange for pickup tomorrow?',
      time: '10:36 AM',
      read: false,
    },
  ];

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="bg-white rounded-xl border border-sky-100 overflow-hidden h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-sky-100">
          <h1 className="text-xl font-display font-semibold text-charcoal">
            Customer Messages
          </h1>
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Conversations List */}
          <div className="w-full sm:w-80 border-r border-sky-100 flex flex-col">
            {/* Search */}
            <div className="p-3 border-b border-sky-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-text/40" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 bg-sky-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-redbull-blue/20"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`w-full p-3 text-left hover:bg-sky-50 transition-colors ${
                    selectedConversation === conv.id ? 'bg-sky-100' : ''
                  } ${conv.unread > 0 ? 'bg-redbull-blue/5' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-redbull-blue-light flex items-center justify-center">
                        <span className="text-sm font-medium text-redbull-blue">{conv.avatar}</span>
                      </div>
                      {conv.status === 'online' && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-charcoal truncate">{conv.customer}</p>
                        <span className="text-xs text-slate-text">{conv.time}</span>
                      </div>
                      <p className="text-xs text-slate-text/70 mb-1">{conv.product}</p>
                      <p className="text-xs text-slate-text truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <div className="w-5 h-5 bg-redbull-blue rounded-full flex items-center justify-center">
                        <span className="text-[10px] text-white">{conv.unread}</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          {selectedConversation ? (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-sky-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-redbull-blue-light flex items-center justify-center">
                    <span className="text-sm font-medium text-redbull-blue">
                      {selectedConv?.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal">{selectedConv?.customer}</p>
                    <p className="text-xs text-slate-text">Regarding: {selectedConv?.product}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedConv?.status === 'online' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedConv?.status === 'online' ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-xl p-3 ${
                        msg.sender === 'me'
                          ? 'bg-redbull-blue text-white'
                          : 'bg-sky-100 text-charcoal'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <div className={`flex items-center gap-1 text-[10px] mt-1 ${
                        msg.sender === 'me' ? 'text-white/70' : 'text-slate-text/70'
                      }`}>
                        <span>{msg.time}</span>
                        {msg.sender === 'me' && msg.read && (
                          <CheckCircle className="w-3 h-3" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-sky-100">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-text hover:text-redbull-blue rounded-full hover:bg-sky-50">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 bg-sky-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-redbull-blue/20"
                  />
                  <button
                    onClick={() => {
                      // Send message logic
                      setNewMessage('');
                    }}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-redbull-blue text-white rounded-full hover:bg-redbull-blue/90 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-slate-text/30 mx-auto mb-3" />
                <p className="text-slate-text">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;