

    $(document).ready(function() {

        var resultRec;
        var modeRec;

        var resultTri;
        var modeTri;
        
        var resultCir;
        var modeCir;
    
        $('#rec-compute').on('click', function() {
    
            var length_ = $('#rec-length').val();
            var width_ = $('#rec-width').val();
            modeRec = $('#rec-mode').val();

            
    
            if (modeRec == 'Rec-Area') {
                resultRec = length_ * width_;
            } else {
                resultRec = (2 * length_) + (2 * width_);
            }
    
            $('#rec-result').val(resultRec.toFixed(2));
    
        });

        $('#tri-compute').on('click', function() {
    
                var base_tri = $('#tri-base').val();
                var height_tri = $('#tri-height').val();

                modeTri = $('#tri-mode').val();

                var side1 = $('#tri-side1').val();
                var side2 = $('#tri-side2').val();
                var side3 = parseFloat($('#tri-side3').val());

                if (modeTri == 'Tri-Area') {
                    resultTri = 0.5 * base_tri * height_tri;
                } else {
                    resultTri = parseFloat(side1) + parseFloat(side2) + side3;
                }

        
                $('#tri-result').val(resultTri.toFixed(2));
        
        });

        $('#cir-compute').on('click', function() {
    
                var radius = $('#cir-radius').val();
                modeCir = $('#cir-mode').val();
        
                if ( modeCir == 'Cir-Area') {
        
                        resultCir = Math.PI * Math.pow(radius, 2);
        
        
                } else {
        
                        resultCir = Math.PI * (2 * radius);
        
                }
        
                $('#cir-result').val(resultCir.toFixed(2));
        
        });
      
        $('#rec-mode, #tri-mode, #cir-mode').on('change', function() {
          
          mode_rec = $('#rec-mode').val();
          mode_tri = $('#tri-mode').val();
          mode_cir = $('#cir-mode').val();
          
          if (mode_rec == 'Rec-Area') {
          
            mode_rec = 'Rectangle - Area';
          
          } else {
          
            mode_rec = 'Rectangle - Perimeter';
          
          }

          

          if (mode_tri == 'Tri-Area') {
            $('.per-container').hide();
            $('.area-container').show();
            mode_tri = 'Triangle - Area';
          
          } else {
            $('.per-container').show();
            $('.area-container').hide();
            mode_tri = 'Triangle - Perimeter';
          
          }

          if (mode_cir == 'Cir-Area') {
          
            mode_cir = 'Circle - Area';
          
          } else {
          
            mode_cir = 'Circle - Perimeter';
          
          }
          
          $('#rec-legend').text(mode_rec);
          $('#tri-legend').text(mode_tri);
          $('#cir-legend').text(mode_cir);
          
        });
      
      });
