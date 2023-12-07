// /* eslint-disable import/no-unresolved */
// /* eslint-disable @typescript-eslint/semi */
// /* eslint-disable @typescript-eslint/prefer-for-of */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/await-thenable */
// /* eslint-disable github/no-then */
// /* eslint-disable no-console */
// /* eslint-disable @typescript-eslint/no-for-in-array */
// /* eslint-disable github/array-foreach */
// /* eslint-disable prettier/prettier */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable no-undef */
// /* eslint-disable i18n-text/no-en */
// /*
//  * This is dashboard.component.ts
//  */
// import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core'
// import { MatTableDataSource } from '@angular/material/table'
// import { RackService } from '../services/rack.service'
// import { Tray } from '../models/tray.model'
// import { Observable } from 'rxjs'
// //import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps'
// import { MapsAPILoader } from '@agm/core'
// import { LogService } from '../../app/services/log.service'
// import { StoreService } from '../store.service'
// import { Store } from '../models/store.model'
// import { User } from '../models/user.model'

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {
//   latitude: number
//   longitude: number
//   address: string
//   selectedMarker = null
//   private geoCoder: any

//   @ViewChild('search')
//   searchElementRef: ElementRef
//   displayedColumns: string[] = ['storeName']
//   // @ViewChild('myGoogleMap', { static: false })
//   // map!: GoogleMap
//   // @ViewChild(MapInfoWindow, { static: false })
//   // info!: MapInfoWindow

//   isQuantity = false
//   search = ''
//   maxZoom = 15
//   minZoom = 8
//   options = {
//     zoomControl: false,
//     scrollwheel: false,
//     disableDoubleClickZoom: true,

//     maxZoom: 15,
//     minZoom: 8
//   }
//   clientStores: any = []
//   storeNames: any = []
//   showAllStores: Boolean
//   showSearchedStore: Boolean
//   infoContent = ''
//   dataSource = new MatTableDataSource<Store[]>()
//   newStoredataSource = new MatTableDataSource<any[]>()
//   // dataSource = new MatTableDataSource<Object>()
  
//   markers = []
//   zoom: number
//   apiLoaded: Observable<boolean>
//   UserObj: User = {}
//   userId?: number
//   schemaName: string
//   stores = [
//     {
//       name: 'Store 1',
//       latitude: 40.785091,
//       longitude: -73.968285,
//       hours: '8AM to 10PM'
//     },
//     {
//       name: 'Store 2',
//       latitude: 4.3346285,
//       longitude: 32.4352628,
//       hours: '9AM to 9PM'
//     }
//   ]
//   constructor(private rackService: RackService, private storeService: StoreService, private ngZone: NgZone, private logger: LogService, private mapsAPILoader: MapsAPILoader,) {
//     this.markers = []
//     this.zoom = 10
//   }

//   ngOnInit(): void {
//     this.UserObj = JSON.parse(sessionStorage.getItem('userObj'))
//     this.getStores(this.UserObj.clientFk)
//     this.userId = this.UserObj.id
//     this.schemaName = sessionStorage.getItem('clientName')
//     this.setCurrentLocation()
//   }

//   getAllStoresandSearch(searchString, userid, clientFk, schemaName): void{
//     if(searchString && searchString !== ""){
//       this.rackSearchListing(searchString, userid, clientFk, schemaName)
//     }else{
//       this.getStores(clientFk)
//     }

//   }

//   getStores(client_fk: number): void {
//     this.storeService
//       .fetchAllStoresByClientFK(client_fk)
//       .subscribe((data: undefined) => {
//         this.dataSource.data = data
//         this.showAllStores = true
//         this.showSearchedStore = false
//         this.clientStores = this.dataSource.data
//       })
//   }

//   rackSearchListing(searchString, userid, clientFk, schemaName): void {
//     this.logger.log(
//       'Start of RackListComponent : rackListing :filterValue',
//       searchString
//     )
//     let storeDatas = []
//     this.showAllStores = false
//         this.showSearchedStore = true
//       this.rackService
//         .serachProductByRack(searchString, userid, clientFk, schemaName)
//         .subscribe((data: any[]) => {
//          storeDatas = data
//          for (let i = 0; i < data.length; i++) {
//           this.storeService.fetchAllStoresByStoreName(clientFk, data[i].storeName).subscribe((storesDatas: any[])=>{
//             storesDatas.forEach(datas =>{
//               this.storeNames.push(datas)
//             })
//           })
//         }
//         })
//       this.logger.log('Start of RackListComponent : searchString ')
//   }


//   private setCurrentLocation(): void {
//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(position => {
//         this.markers.push({
//           position: {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           },
//           label: {
//             color: 'black'
//           }
//         })
//         this.latitude = position.coords.latitude
//         this.longitude = position.coords.longitude
//         this.getAddress(this.latitude, this.longitude)
//       })
//     }
//   }

//   getAddress(latitude, longitude): void {
//     this.geoCoder.geocode(
//       { location: { lat: latitude, lng: longitude } },
//       (results, status) => {
//         if (status === 'OK') {
//           if (results[0]) {
//             this.zoom = 12
//             this.address = results[0].formatted_address
//           } else {
//             window.alert('No results found')
//           }
//         } else {
//           window.alert(`Geocoder failed due to: ${status}`)
//         }
//       }
//     )
//   }


//   markerDragEnd($event: any): void {
//     console.log($event)
//     this.latitude = $event.coords.lat
//     this.longitude = $event.coords.lng
//     this.getAddress(this.latitude, this.longitude)
//   }

//   zoomIn(): void {
//     if (this.zoom < this.maxZoom) this.zoom++
//    // this.logger.log('Get Zoom', this.map.getZoom())
//   }

//   zoomOut(): void {
//     if (this.zoom > this.minZoom) this.zoom--
//   }

//   eventHandler(event, name: string): void {
//     this.logger.log(event, name)

//     // Add marker on double click event
//     if (name === 'mapDblclick') {
//       this.dropMarker(event)
//     }
//   }

//   // Markers
//   logCenter(): void {
//     //this.logger.log(JSON.stringify(this.map.getCenter()))
//   }

//   selectMarker(event): void {
//     this.selectedMarker = {
//       lat: event.latitude,
//       lng: event.longitude
//     }
//   }

//   dropMarker(event): void {
//     this.markers.push({
//       position: {
//         lat: event.latLng.lat(),
//         lng: event.latLng.lng()
//       },
//       label: {
//         color: 'blue',
//         text: `Marker label ${this.markers.length + 1}`
//       },
//       title: `Marker title ${this.markers.length + 1}`,
//       info: `Marker info ${this.markers.length + 1}`,
//       options: {
//         animation: google.maps.Animation.DROP
//       }
//     })
//   }

//   mapClicked($event): void {
//     this.markers.push({
//       lat: $event.coords.lat,
//       lng: $event.coords.lng,
//       draggable: true
//     })
//   }

//   // openInfo(marker: MapMarker, content: string): void {
//   //   this.infoContent = content
//   //   this.info.open(marker)
//   // }
// }
