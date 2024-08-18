import { ref } from "vue";
//@ts-ignore
import { v4 as uuidv4 } from "uuid";

interface Good {
  id: number;
  name: string;
  picture_url?: string;
  price: number;
  quantity: number;
}


export const isOpenSidebar = ref(false);
export const isOpenCart = ref(false);

abstract class AbstractCardStorage {
  goods = ref<Good[]>([]);
  uuid = ref("");
  isActive = ref<boolean>(false);
  storage = useCookie("card");
  protected constructor() {
    const id = uuidv4();
    this.uuid.value = id;
    if (this.storage.value != null) {
      //@ts-ignore
      const card: {uuid: string, goods: Good[]} = this.storage.value;
      this.goods.value = card.goods;
      this.uuid.value = card.uuid;
    }
  }
  abstract addGood(good: Good): any;
  abstract increaseGood(id: number): any;
  abstract decreaseGood(id: number): any;
  abstract removeGood(id: number): any;
  abstract get totalCost(): number;
  abstract save(): any;
}

class LocalCardStorage extends AbstractCardStorage {
  constructor() {
    super();
  }
  get totalCost() {
    let total = 0;
    this.goods.value.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }
  checkInGoods(id: number) {
    return this.goods.value.filter((item) => item.id == id).length > 0;
  }
  addGood(good: Good) {
    const exists = this.goods.value.filter((item) => item.id == good.id);
    if (exists.length == 0) {
      this.goods.value.push(good);
    } else {
      exists[0].quantity += 1;
    }
    this.save();
  }
  increaseGood(id: number) {
    const exists = this.goods.value.filter((item) => item.id == id);
    if (exists.length) {
      exists[0].quantity += 1;
      this.save();
    }
  }
  resetCard() {
    const id = uuidv4();
    this.uuid.value = id;
    this.goods.value = [];
    this.save();
  }
  decreaseGood(id: number) {
    const exists = this.goods.value.filter((item) => item.id == id);
    if (exists.length) {
      if (exists[0].quantity <= 1) {
        this.removeGood(id);
        return;
      }
      exists[0].quantity -= 1;
      this.save();
      return;
    }
  }
  removeGood(id: number) {
    const exists = this.goods.value.findIndex((item) => item.id == id);
    if (exists != -1) {
      this.goods.value.splice(exists, 1);
      this.save();
    }
  }
  save() {
    this.storage.value = JSON.stringify({
      uuid: this.uuid.value,
      goods: this.goods.value,
    });
  }
}

export const CardStorage = (function () {
  let instance: LocalCardStorage;
  function createInstance() {
    return new LocalCardStorage();
  }
  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();
