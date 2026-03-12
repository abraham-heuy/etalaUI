// pages/dashboard/messages.tsx
import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Search,
  CheckCircle,
  Send,
  Paperclip,
  Phone,
  Video,
  Info,
  ChevronLeft
} from 'lucide-react';

const MessagesPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const [showMobileList, setShowMobileList] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    {
      id: 5,
      customer: 'David Mwangi',
      lastMessage: 'Is this still available?',
      time: '3 days ago',
      unread: 0,
      product: 'Wireless Headphones',
      avatar: 'DM',
      status: 'offline',
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

  // Handle conversation selection on mobile
  const handleSelectConversation = (id: number) => {
    setSelectedConversation(id);
    if (isMobile) {
      setShowMobileList(false);
    }
  };

  // Handle back to list on mobile
  const handleBackToList = () => {
    setShowMobileList(true);
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="bg-white rounded-xl border border-sky-100 overflow-hidden h-full flex flex-col">
        {/* Header - Changes based on view */}
        <div className="p-4 border-b border-sky-100">
          {isMobile && !showMobileList ? (
            // Mobile chat header with back button
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToList}
                  className="p-1 hover:bg-sky-50 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-slate-text" />
                </button>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-redbull-blue-light flex items-center justify-center">
                      <span className="text-sm font-medium text-redbull-blue">
                        {selectedConv?.avatar}
                      </span>
                    </div>
                    {selectedConv?.status === 'online' && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal">{selectedConv?.customer}</p>
                    <p className="text-xs text-slate-text">
                      {selectedConv?.status === 'online' ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-sky-50 rounded-full transition-colors">
                  <Phone className="w-5 h-5 text-slate-text" />
                </button>
                <button className="p-2 hover:bg-sky-50 rounded-full transition-colors">
                  <Video className="w-5 h-5 text-slate-text" />
                </button>
                <button className="p-2 hover:bg-sky-50 rounded-full transition-colors">
                  <Info className="w-5 h-5 text-slate-text" />
                </button>
              </div>
            </div>
          ) : (
            // Default header
            <h1 className="text-xl font-display font-semibold text-charcoal">
              Messages
            </h1>
          )}
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Conversations List - Hidden on mobile when chat is open */}
          <div 
            className={`${
              isMobile 
                ? showMobileList ? 'w-full' : 'hidden'
                : 'w-full sm:w-80'
            } border-r border-sky-100 flex flex-col bg-white`}
          >
            {/* Search - Only show on list view */}
            {(showMobileList || !isMobile) && (
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
            )}

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv.id)}
                  className={`w-full p-3 text-left hover:bg-sky-50 transition-colors ${
                    !isMobile && selectedConversation === conv.id ? 'bg-sky-100' : ''
                  } ${conv.unread > 0 ? 'bg-redbull-blue/5' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-redbull-blue-light flex items-center justify-center">
                        <span className="text-sm font-medium text-redbull-blue">{conv.avatar}</span>
                      </div>
                      {conv.status === 'online' && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-charcoal truncate">{conv.customer}</p>
                        <span className="text-xs text-slate-text ml-2 flex-shrink-0">{conv.time}</span>
                      </div>
                      <p className="text-xs text-slate-text/70 mb-1 truncate">{conv.product}</p>
                      <p className="text-xs text-slate-text truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <div className="w-5 h-5 bg-redbull-blue rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] text-white">{conv.unread}</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area - Full screen on mobile when open */}
          {selectedConversation ? (
            <div 
              className={`${
                isMobile && showMobileList ? 'hidden' : 'flex-1'
              } flex flex-col bg-white`}
            >
              {/* Chat Header - Mobile back button handled above */}
              {!isMobile && (
                <div className="p-4 border-b border-sky-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-redbull-blue-light flex items-center justify-center">
                        <span className="text-sm font-medium text-redbull-blue">
                          {selectedConv?.avatar}
                        </span>
                      </div>
                      {selectedConv?.status === 'online' && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
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
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f0f2f5] dark:bg-gray-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-3 ${
                        msg.sender === 'me'
                          ? 'bg-redbull-blue text-white rounded-br-none'
                          : 'bg-white text-charcoal rounded-bl-none shadow-sm border border-sky-100'
                      }`}
                    >
                      <p className="text-sm break-words">{msg.text}</p>
                      <div className={`flex items-center gap-1 text-[10px] mt-1 ${
                        msg.sender === 'me' ? 'text-white/70' : 'text-slate-text/70'
                      }`}>
                        <span>{msg.time}</span>
                        {msg.sender === 'me' && (
                          <CheckCircle className={`w-3 h-3 ${msg.read ? 'text-blue-300' : 'text-white/50'}`} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-3 sm:p-4 border-t border-sky-100 bg-white">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-text hover:text-redbull-blue rounded-full hover:bg-sky-50 flex-shrink-0">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2.5 bg-sky-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-redbull-blue/20"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && newMessage.trim()) {
                        // Send message logic
                        setNewMessage('');
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      // Send message logic
                      setNewMessage('');
                    }}
                    disabled={!newMessage.trim()}
                    className="p-2.5 bg-redbull-blue text-white rounded-full hover:bg-redbull-blue/90 transition-colors disabled:opacity-50 flex-shrink-0"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // No conversation selected
            <div className="hidden sm:flex flex-1 items-center justify-center bg-[#f8fafc]">
              <div className="text-center">
                <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-redbull-blue" />
                </div>
                <h3 className="text-lg font-display font-medium text-charcoal mb-2">
                  Your Messages
                </h3>
                <p className="text-sm text-slate-text max-w-xs">
                  Select a conversation to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;