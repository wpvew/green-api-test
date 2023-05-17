import axios from 'axios';

const HOST = 'https://api.green-api.com';

export type TAxiosResponse<T> = { data: T };

export type TReceiveNotificationData = {
  receiptId: number;
  body: {
    typeWebhook: 'incomingMessageReceived';
    timestamp: number;
    idMessage: string;
    senderData: {
      chatId: string;
      sender: string;
      senderName: string;
    };
    messageData: {
      typeMessage: 'textMessage';
      textMessageData: {
        textMessage: string;
      };
    };
  };
};

export type TChatHistoryData = {
  type: 'incoming' | 'outgoing';
  idMessage: string;
  timestamp: number;
  typeMessage: 'textMessage' | 'extendedTextMessage' | 'quotedMessage' | 'documentMessage' | 'imageMessage';
  textMessage: string;
  senderId?: string;
  senderName?: string;
  time?: string;
};

class ApiServer {
  static async createQr(loginData: {
    idInstance: string;
    apiTokenInstance: string;
  }): Promise<TAxiosResponse<{ type: string; message: string }>> {
    return await axios.get(`${HOST}/waInstance${loginData.idInstance}/qr/${loginData.apiTokenInstance}`);
  }

  static async getChatHistory(
    data: {
      chatId: string;
      count: number;
    },
    loginData: { idInstance: string; apiTokenInstance: string }
  ): Promise<TAxiosResponse<Array<TChatHistoryData>>> {
    return await axios.post(
      `${HOST}/waInstance${loginData.idInstance}/getChatHistory/${loginData.apiTokenInstance}`,
      data
    );
  }

  static async sendMessage(
    data: { chatId: string; message: string },
    loginData: { idInstance: string; apiTokenInstance: string }
  ): Promise<TAxiosResponse<{ idMessage: string }>> {
    return await axios.post(
      `${HOST}/waInstance${loginData.idInstance}/sendMessage/${loginData.apiTokenInstance}`,
      data
    );
  }

  static async receiveNotification(loginData: {
    idInstance: string;
    apiTokenInstance: string;
  }): Promise<TAxiosResponse<TReceiveNotificationData>> {
    return await axios.get(
      `${HOST}/waInstance${loginData.idInstance}/receiveNotification/${loginData.apiTokenInstance}`
    );
  }

  static async getContactInfo(
    data: { chatId: string },
    loginData: { idInstance: string; apiTokenInstance: string }
  ): Promise<TAxiosResponse<{ name: string; avatar: string }>> {
    return await axios.post(
      `${HOST}/waInstance${loginData.idInstance}/GetContactInfo/${loginData.apiTokenInstance}`,
      data
    );
  }

  static async getStateInstance(loginData: {
    idInstance: string;
    apiTokenInstance: string;
  }): Promise<TAxiosResponse<{ stateInstance: string }>> {
    return await axios.get(`${HOST}/waInstance${loginData.idInstance}/getStateInstance/${loginData.apiTokenInstance}`);
  }

  static async getAvatar(
    data: { chatId: string },
    loginData: { idInstance: string; apiTokenInstance: string }
  ): Promise<TAxiosResponse<{ urlAvatar: string }>> {
    return await axios.post(`${HOST}/waInstance${loginData.idInstance}/getAvatar/${loginData.apiTokenInstance}`, data);
  }

  static async getSettings(loginData: {
    idInstance: string;
    apiTokenInstance: string;
  }): Promise<TAxiosResponse<{ urlAvatar: string }>> {
    return await axios
      .get(`${HOST}/waInstance${loginData.idInstance}/getSettings/${loginData.apiTokenInstance}`)
      .then(async (res) => {
        return await this.getAvatar({ chatId: res.data.wid }, loginData);
      });
  }

  static async deleteNotification(
    loginData: {
      idInstance: string;
      apiTokenInstance: string;
    },
    receiptId: number
  ): Promise<TAxiosResponse<{ result: boolean }>> {
    return await axios.delete(
      `${HOST}/waInstance${loginData.idInstance}/deleteNotification/${loginData.apiTokenInstance}/${receiptId}`
    );
  }

  static async checkWhatsapp(
    loginData: {
      idInstance: string;
      apiTokenInstance: string;
    },
    phoneNumber: string
  ): Promise<TAxiosResponse<{ existsWhatsapp: boolean }>> {
    return await axios.post(`${HOST}/waInstance${loginData.idInstance}/checkWhatsapp/${loginData.apiTokenInstance}/`, {
      phoneNumber,
    });
  }
}

export default ApiServer;
