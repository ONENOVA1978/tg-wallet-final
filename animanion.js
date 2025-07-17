// Пример реализации быстрого обмена
function quickSwap(from, to) {
  tgWebApp.showPopup({
    title: `Обмен ${from} → ${to}`,
    message: "Введите сумму:",
    buttons: [{
      type: "default",
      text: "Подтвердить",
      callback: () => completeSwap(from, to)
    }]
  });
}