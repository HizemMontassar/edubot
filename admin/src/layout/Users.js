import React, { Component } from 'react'  
  
export class Users extends Component {  
    render() {  
    return (
        <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Users</h1>
              </div>
        
            </div>
          </div>
        </section>
        
        <section class="content">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Users</h3>
            </div>
            <div class="card-body">
              <div id="jsGrid1"></div>
            </div>
          </div>
        </section>
  
        </div>
        
    )
    }

}
export default Users
