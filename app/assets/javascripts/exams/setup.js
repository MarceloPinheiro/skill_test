window.Exams = {}

$( document ).on('turbolinks:load', function() {
  if($("[data-exams]").length > 0){
    Exams.app = new Exams.App()
    Exams.app.start()
  }
  if($("[data-view3d='wrapper']").length > 0){
    
    Exams.canvas = new Exams.Canvas()
    Exams.canvas.initThree()
  }
})