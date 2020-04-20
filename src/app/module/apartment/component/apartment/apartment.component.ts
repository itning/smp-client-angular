import {Component, OnInit} from '@angular/core';
import {Apartment} from '../../../../entity/Apartment';
import {ApartmentService} from '../../../../service/apartment.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss']
})
export class ApartmentComponent implements OnInit {
  editId: string | null;
  listOfData: Apartment[] = [];
  isLoading = false;
  isAddModalVisible = false;
  newApartmentName: string;
  isOkLoading = false;
  originalName: string;

  constructor(private apartmentService: ApartmentService,
              private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.isLoading = true;
    this.apartmentService.getAllApartment().subscribe((apartments) => {
        this.listOfData = apartments;
      },
      () => {
      },
      () => {
        this.isLoading = false;
      });
  }

  startEdit(data: Apartment): void {
    if (!this.editId) {
      this.editId = data.id;
      this.originalName = data.name;
    }
  }

  stopEdit(data: Apartment): void {
    if (data.name && data.name.trim() !== '') {
      if (data.name.trim() === this.originalName) {
        this.editId = null;
        return;
      }
      this.apartmentService.updateApartmentName(data.id, data.name).subscribe(() => {
        this.message.success('更新成功');
      });
      this.editId = null;
    } else {
      this.message.error('新公寓名不能为空');
    }
  }

  addApartment() {
    this.isAddModalVisible = true;
  }

  deleteApartment(id: string) {
    console.log(`del ${id}`);
    this.apartmentService.delApartment(id).subscribe(() => {
      this.message.success('删除成功');
      this.listOfData = this.listOfData.filter((item) => item.id !== id);
    });
  }

  handleOk() {
    if (this.newApartmentName && this.newApartmentName.trim() !== '') {
      this.isOkLoading = true;
      this.apartmentService.addApartment(this.newApartmentName).subscribe((apartment) => {
          this.listOfData = [...this.listOfData, apartment];
          this.isAddModalVisible = false;
          this.message.success('新增成功');
        }, () => {
        },
        () => {
          this.isOkLoading = false;
        });
    } else {
      this.message.error('请输入公寓名称');
    }
  }
}
