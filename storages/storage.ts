import axiosInstance from "@/api";
import { getProducts } from "@/api/products";
import { ref } from "vue";
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';

interface Good {
    id: number;
    name: string;
    picture_url?: string;
    price: number;
    quantity: number;
}

export interface FiltersType {
  capacities:  number[];
  body_types:  BodyType[];
  fuel_types:  BodyType[];
  drive_types: BodyType[];
  gear_types:  BodyType[];
  colors:      BodyType[];
  powers:      number[];
}

export interface BodyType {
  id:   number;
  name: string;
}

export const isOpenSidebar = ref(false);
export const isOpenCart = ref(false);

abstract class AbstractCardStorage {
    goods = ref<Good[]>([]);
    uuid = ref('');
    isActive = ref<boolean>(false);
    storage = useCookie('card');
    constructor() {
        const id = uuidv4();
        this.uuid.value = id;
        if (this.storage.value != null) {
          const card = this.storage.value;
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
        this.goods.value.forEach((item)=>{
            total += item.price * item.quantity;
        });
        return total;
    }
    checkInGoods(id: number) {
      return this.goods.value.filter(item=>item.id==id).length > 0;
    }
    addGood(good: Good) {
        const exists = this.goods.value.filter(item=>item.id == good.id);
        if (exists.length == 0) {
            this.goods.value.push(good);
        }
        else {
            exists[0].quantity += 1;
        }
        this.save();
    }
    increaseGood(id: number) {
        const exists = this.goods.value.filter(item=>item.id == id);
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
        const exists = this.goods.value.filter(item=>item.id == id);
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
        const exists = this.goods.value.findIndex(item=>item.id == id);
        if (exists != -1) {
            this.goods.value.splice(exists, 1);
            this.save();
        }
    }
    save() {
        this.storage.value = JSON.stringify({
            uuid: this.uuid.value,
            goods: this.goods.value
        })
    }
}


interface Category {
    id: number;
    name: string;
}



class NetworkCatalogStorage {
    categories = ref<Category[]>([
      { id: 1, name: 'Автозапчасти' },
      { id: 2, name: 'Запчасти на коммерческие' },
      { id: 3, name: 'Мотозапчасти' },
      { id: 4, name: 'Шины' },
      { id: 5, name: 'Диски' },
      { id: 6, name: 'Аксессуары и мультимедиа' },
      { id: 7, name: 'Масла и автохимия' },
      { id: 8, name: 'Авто на разбор' },
      { id: 9, name: 'Магазины шин и дисков' },
      { id: 10, name: 'Магазины запчастей и авторазборы' }
    ]);
    products = ref([]);
    categoryLoadError: boolean = false;
    selectedValues = ref({
      manufactor_id: '',
      category: [],
      modification: [],
      capacity: [],
      body_type: [],
      fuel_type: [],
      drive_type: [],
      gear_type: [],
      color: [],
      powers: []
    });

    loadedFilters = ref<FiltersType | null>(null);
    loadFilters() {
      axiosInstance.get<FiltersType>('/api/car/filters/').then(res=>{
        this.loadedFilters.value = res.data;
      });
    }

    updateSelectedValues(key: string, value:any) {
      console.log(key, value);
      // @ts-ignore
      const index = this.selectedValues.value[key].findIndex(item=>item==value);
      if (index != -1) {
        // @ts-ignore
        this.selectedValues.value[key].splice(index, 1);
        return;
      }
      // @ts-ignore
      this.selectedValues.value[key].push(value);

    }

    get filters(): any[] {
        return  [
            // {
            //   id: 'capacities',
            //   name: 'Mощность',
            //   type: 'range',
            //   range: {
            //     labelFrom: 'От',
            //     labelTo: 'До'
            //   }
            // },
            {
              id: 'body_type',
              name: 'Тип кузова', 
              isOpen: true,
              options: this.loadedFilters.value?.body_types.map((item)=>{
                return {
                  value: item.id,
                  label: item.name,
                  checked: this.selectedValues.value.body_type.filter(id=>id == item.id).length > 0 ? true : false 
                }
              })
            },
            {
              id: 'fuel_type',
              name: 'Тип заправки',
              isOpen: true,
              options: this.loadedFilters.value?.fuel_types.map((item)=>{
                return {
                    value: item.id,
                    label: item.name,
                    checked: this.selectedValues.value.fuel_type.filter(id=>id == item.id).length > 0 ? true : false 
                }
              })
            },
            {
              id: 'drive_type',
              name: 'Тип привода',
              isOpen: false,
              options: this.loadedFilters.value?.drive_types.map((item)=>{
                return {
                    value: item.id,
                    label: item.name,
                    checked: this.selectedValues.value.drive_type.filter(id=>id == item.id).length > 0 ? true : false 
                }
              })
            },
            {
              id: 'gear_type',
              name: 'Тип',
              isOpen: false,
              options: this.loadedFilters.value?.gear_types.map((item)=>{
                return {
                    value: item.id,
                    label: item.name,
                    checked: this.selectedValues.value.gear_type.filter(id=>id == item.id).length > 0 ? true : false 
                }
              })
            },
            {
              id: 'color',
              name: 'Цвет',
              isOpen: false,
              options: this.loadedFilters.value?.colors.map((item)=>{
                return {
                    value: item.id,
                    label: item.name,
                    checked: this.selectedValues.value.color.filter(id=>id == item.id).length > 0 ? true : false 
                }
              })
            },
            {
              id: 'powers',
              name: 'Power',
              type: 'array',
              isOpen: false,
              options: this.loadedFilters.value?.powers
            },
            {
              id: 'capacity',
              name: 'Mощность', 
              type: 'array',
              isOpen: false,
              options: this.loadedFilters.value?.capacities
            },
          ]
    }
    isProductLoading = ref<boolean>(false);
    async loadProducts(value: any) {
      let string = '?';
      const selectedValues: any = value;
      Object.keys(selectedValues).forEach(function(key, _) {
        const ne: any = selectedValues[key]
        string += `${key}=${ne}&`;
      });
      this.isProductLoading.value = true;

      // const data = await getProducts(string);

      getProducts(string).then((res: any)=>{
        this.products.value = res.results
      })
      .catch(e=>{
        console.log(e);
      })
      .finally(()=>{
        this.isProductLoading.value = false
      });
    }
    
    async loadCategories() {
        await fetch('');
    }

}


export const CatalogStorage = (function() {
    let instance: NetworkCatalogStorage;
    function createInstance() {
        return new NetworkCatalogStorage();
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