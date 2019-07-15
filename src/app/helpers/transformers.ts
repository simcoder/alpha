import { firestore } from 'firebase';
import { Menu } from '../app.component.interfaces';
import _ from 'lodash';

export const transformSideMenu = (snapshot:firestore.QuerySnapshot, role : string) : Menu[]=>{
    const result: Menu[] = [];
    snapshot.docs.forEach(item => {
        if (item.exists) {
          const menuData = item.data();
          //only include role base specific modulesx
          if(menuData.role.includes(role)){
            const route = [{ outlets: { details: [menuData.route] } }];
            result.push({ order: menuData.order, name: menuData.name, route, selectedClass: menuData.selectedClass,icon:menuData.icon ,featureFlag: menuData.featureFlag });
          }
        }
      });
      const sortedMenuItems = _.sortBy(result, 'order');
  return sortedMenuItems
}