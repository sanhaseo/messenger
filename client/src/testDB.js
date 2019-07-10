const users = [
  {
    id: 1,
    name: 'john',
    password: 123,
    contacts: ['jane','sanha'],
    conversations: [11,22]
  },
  {
    id: 2,
    name: 'jane',
    password: 123,
    contacts: ['john','sanha'],
    conversations: [11]
  },
  {
    id: 3,
    name: 'sanha',
    password: 123,
    contacts: ['jane','john'],
    conversations: [11,22]
  },
  {
    id: 4,
    name: 'sarah',
    password: 123,
    contacts: [],
    conversations: []
  },
  {
    id: 5,
    name: 'andy',
    password: 123,
    contacts: [],
    conversations: []
  },
  {
    id: 6,
    name: 'bethy',
    password: 123,
    contacts: [],
    conversations: []
  },
  {
    id: 6,
    name: 'charlie',
    password: 123,
    contacts: [],
    conversations: []
  }
];

const conversations = [
  {
    id: 11,
    participants: ['jane','john','sanha'],
    messages: [
      {
        user: 'john',
        text: 'hello',
        date: 1562485438811
      },
      {
        user: 'jane',
        text: 'hi',
        date: (new Date('December 17, 1995 03:24:00')).toDateString()
      },
      {
        user: 'sanha',
        text: 'i mean',
        date: (new Date('December 17, 1995 03:24:00')).toDateString()
      },
    ]
  },
  {
    id: 22,
    participants: ['john','sanha'],
    messages: [
      {
        user: 'john',
        text: 'i cant even read english',
        date: (new Date('December 17, 1995 03:24:00')).toDateString()
      },
      {
        user: 'john',
        text: 'tell me quick',
        date: (new Date('December 17, 1995 03:24:00')).toDateString()        
      },
      {
        user: 'sanha',
        text: 'is it single target?',
        date: (new Date('December 17, 1995 03:24:00')).toDateString()        
      },
      {
        user: 'john',
        text: 'hello my friend',
        date: (new Date('December 17, 1995 03:24:00')).toDateString()        
      },
    ]
  }
];

export const testGetConversations = username => {
  const conversationIds = users.find(
    user => user.name === username
  ).conversations;
  return conversations.filter(conversation => conversationIds.includes(conversation.id));
};

export const testGetContacts = username => {
  const user = users.find(user => user.name === username);
  return user.contacts;
};

export const testGetUser = username => {
  const user = users.find(user => user.name === username);
  return typeof user === 'undefined' ? false : true;
};