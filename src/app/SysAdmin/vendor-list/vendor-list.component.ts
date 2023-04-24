import { Component, OnInit } from '@angular/core';
import { VendorUser } from 'src/app/shared/models/user';
import { SysAdminService } from '../sysAdmin.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  vendors: VendorUser[];
  modalVendor: VendorUser;
  isModalOpen:boolean= false;

  constructor(private vendor_service: SysAdminService) { }

  ngOnInit(): void {
    this.loadVendors();

    this.modalVendor = {
      vendorID: 0,
      vendorname: '',
      address:'',
      phone:''
    }
  }

  loadVendors(): void {
    this.vendor_service.getVendors().subscribe(
      (data)=> {
        this.vendors = data;
      }
    );
  }

  createVendor(): void {
    this.modalVendor = {
      vendorID: 0,
      vendorname: '',
      address:'',
      phone:''
    }
    this.isModalOpen = true;
  }

  edit(item): void {
    let items =JSON.stringify(item);
    this.modalVendor=JSON.parse(items);
    this.isModalOpen=true;
    console.log(item);
  }

  saveOrUpdateVendor(): void {
    if(this.modalVendor.vendorID > 0){
      let update_pro = {
        "vendorID": this.modalVendor.vendorID,
        "vendorname": this.modalVendor.vendorname,
        "address": this.modalVendor.address,
        "phone": this.modalVendor.phone
      }
      this.vendor_service.updateVendor(update_pro).subscribe(
        data=> {
        let old_obj = this.vendors.find(x=>x.vendorID==data.vendorID);
        let x = this.vendors.indexOf(old_obj);
        if(x>-1){
          this.vendors[x] = data;
        }
        this.isModalOpen = false;
      });
    } else {
      let new_pro = {
        //"id": this.modalCategory.id,
        "vendorname": this.modalVendor.vendorname,
        "address": this.modalVendor.address,
        "phone": this.modalVendor.phone
      }

      this.vendor_service.createVendor(new_pro).subscribe(data=>{
        this.vendors.push(data);
        this.isModalOpen = false;
      },error=>{
        console.log("Failed to login");
        console.log(error);
      })
    }
  }

  delete(item): void {
    let items =JSON.stringify(item);
    this.modalVendor=JSON.parse(items);
    console.log(item);

    this.vendor_service.deleteVendor(this.modalVendor).subscribe(()=> {
      let old_obj = this.vendors.find(x=>x.vendorID==item.vendorID);
      let x = this.vendors.indexOf(old_obj);
      if(x>-1){
        this.vendors.splice(x,1);
      }
    });
  }

  openmodal(): void {
    this.isModalOpen = true;
  }

  closemodal(): void {
    this.isModalOpen = false;
  }

}
