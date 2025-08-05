const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

logoutButton.action = () => {
    ApiConnector.logout(result => {
        if(result){
            location.reload();
        };
    });
};

ApiConnector.current(({ success, data }) => {
    if(success) {
        ProfileWidget.showProfile(data);
    };
});

const updateRatesBoard = () => {
    ApiConnector.getStocks(({ success, data }) => {
        if (success){
            ratesBoard.clearTable();
            ratesBoard.fillTable(data)
        };
    });
};

updateRatesBoard();
setInterval(updateRatesBoard,60000);

moneyManager.addMoneyCallback = ({ currency, amount }) => {
    ApiConnector.addMoney({ currency, amount }, ({ success, error, data }) => {
        if(success){
            ProfileWidget.showProfile(data);
            moneyManager.setMessage(success, 'Баланс успешно пополнен!😊');
        } else {
            moneyManager.setMessage(success, error || 'Ошибка! Что-то пошло не так.😥');
        };
    });
};

moneyManager.conversionMoneyCallback = ({ fromCurrency, targetCurrency, fromAmount }) => {
    ApiConnector.convertMoney({ fromCurrency, targetCurrency, fromAmount }, ({ success, error, data }) => {
        if(success){
            ProfileWidget.showProfile(data);
            moneyManager.setMessage(success, 'Конвертация выполнена успешно!😊');
        } else {
            moneyManager.setMessage(success, error || 'Ошибка! Что-то пошло не так.😥');
        }; 
    });
};

moneyManager.sendMoneyCallback = ({ to, currency, amount }) => {
    ApiConnector.transferMoney({ to, currency, amount }, ({ success, error, data }) => {
        if(success){
            ProfileWidget.showProfile(data);
            moneyManager.setMessage(success, 'Перевод пользователю выполнен успешно!😊');
        } else {
            moneyManager.setMessage(success, error || 'Ошибка! Что-то пошло не так.😥');
        };
    });
};

ApiConnector.getFavorites(({ success, data }) => {
    if(success){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(data);
        moneyManager.updateUsersList(data);
    };
});
 
favoritesWidget.addUserCallback = ({ id, name }) => {
    ApiConnector.addUserToFavorites({id, name}, ({ success, error, data }) => {
        if(success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(data);
            moneyManager.updateUsersList(data);
            favoritesWidget.setMessage(success, 'Пользователь добавлен в Избранное!😊');
        } else {
            favoritesWidget.setMessage(success, error || 'Ошибка! Что-то пошло не так.😥');
        };
    });
};

favoritesWidget.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, ({ success, error, data }) => {
        if(success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(data);
            moneyManager.updateUsersList(data);
            favoritesWidget.setMessage(success, 'Пользователь был удалён из Избранного!😊');
        } else {
            favoritesWidget.setMessage(success, error || 'Ошибка! Что-то пошло не так.😥');
        };
    });
};