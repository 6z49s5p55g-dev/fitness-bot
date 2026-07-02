const TelegramBot = require("node-telegram-bot-api");

// ⚠️ ВСТАВЬ СВОЙ ТОКЕН СЮДА (НЕ ОТПРАВЛЯЙ НИКОМУ)
const TOKEN = "8632053933:AAEt6LbLw4zry19ZFt8YDOnzoajWdKWmmuQ";

const bot = new TelegramBot(TOKEN, { polling: true });

let users = {};

function getUser(id){
  if(!users[id]){
    users[id] = { walk:0, vacuum:0, plank:0 };
  }
  return users[id];
}

bot.onText(/\/start/, (msg)=>{
  const id = msg.chat.id;

  bot.sendMessage(id, "💪 Фитнес бот", {
    reply_markup:{
      inline_keyboard:[
        [{text:"🚶‍♂️ Ходьба", callback_data:"walk"}],
        [{text:"🧠 Вакуум", callback_data:"vacuum"}],
        [{text:"💪 Планка", callback_data:"plank"}],
        [{text:"📊 Прогресс", callback_data:"progress"}]
      ]
    }
  });
});

bot.on("callback_query",(q)=>{
  const id = q.message.chat.id;
  const u = getUser(id);

  if(q.data==="walk") u.walk=1;
  if(q.data==="vacuum") u.vacuum=1;
  if(q.data==="plank") u.plank=1;

  if(q.data==="progress"){
    const done = u.walk + u.vacuum + u.plank;
    bot.sendMessage(id, `📊 ${done}/3`);
  }
});
